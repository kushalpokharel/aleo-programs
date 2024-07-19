import simple_token.aleo;

program rps001.aleo {

    struct GameInfo {
        deadline:u32,
        turn: bool,
        is_complete:bool
    }

    mapping game_turn : u64 => GameInfo;

    record Game{
        owner:address, 
        id: u64
        challenger_move:group,
        acceptor_move:u8,
        player1:address,
        player2:address,
        is_winner:bool,
        each_stake:u64
    }
    record Reedem{
        owner:address,
        // false = opponent, true = initiator
        id:u64,
        turn:bool,
        amount:u64,
        is_complete:bool
    }

    function hash_choice(choice:u8, key:u128)->group{
        let key_hash:scalar = BHP256::hash_to_scalar(key);
        return BHP256::commit_to_group(choice, key_hash);
    }

    const rps_contract:address = aleo13d9dg6cffft3pj66tjm24lccrrdfl708p05u3z7s6lwhl0racqxswukjq4;
    
    mapping account: address => u64;

    record token {
        // The token owner.
        owner: address,
        // The token amount.
        amount: u64,
    }


    transition challenge(game_id:u64, opponent:address, choice: u8, key:u128, deadline:u32, tok: token, stake_amount:u64) -> (Game, Reedem) {
        let move: group = hash_choice(choice, key);
        simple_token.aleo/transfer_private_to_public(tok, rps_contract, stake_amount);
        return ( Game{
            id:game_id,
            owner:opponent,
            challenger_move:move,
            acceptor_move:0u8,
            player1:self.signer,
            player2:opponent,
            is_winner:false,
            each_stake:stake_amount
        }, Reedem{
            owner:self.signer,
            turn:false,
            id:game_id,
            amount:stake_amount,
            is_complete:false
        }) then finalize(game_id, deadline);
    }
    finalize challenge(id:u64, deadline:u32) {
        let default_game:GameInfo = GameInfo{deadline:0u32, turn:false, is_complete:false};
        let is_new_game:GameInfo = Mapping::get_or_use(game_turn, id , default_game);
        assert_eq(is_new_game.deadline, 0u32);
        assert(block.height + 50u32 <= deadline);
        let game_info: GameInfo = GameInfo {deadline:deadline, turn:false, is_complete:false};
        Mapping::set(game_turn, id, game_info);
    }

    transition accept(game_rec:Game, choice:u8, tok: token, stake_amount:u64) -> (Game, Reedem){
        simple_token.aleo/transfer_private_to_public(tok, rps_contract, stake_amount);
        return ( Game{
            id:game_rec.id,
            owner:game_rec.player1,
            challenger_move:game_rec.challenger_move,
            acceptor_move:choice,
            player1:game_rec.player1,
            player2:game_rec.player2,
            is_winner:false,
            each_stake:stake_amount
        },Reedem{
            owner:self.signer,
            turn:true,
            id:game_rec.id,
            amount:stake_amount+stake_amount,
            is_complete:false
        }) then finalize(game_rec.id);
    }
    finalize accept(id:u64) {
        let default_game:GameInfo = GameInfo{deadline:0u32, turn:false, is_complete:false};
        let game:GameInfo = Mapping::get_or_use(game_turn, id, default_game);
        assert_neq(game.deadline, 0u32);
        assert(block.height < game.deadline);
        let game_info: GameInfo = GameInfo {deadline:game.deadline, turn:true, is_complete:false};
        Mapping::set(game_turn, id, game_info);
    }

    transition claim_reward(reedem_rec:Reedem)-> simple_token.aleo/token{
        assert(reedem_rec.amount>0u64);
        return simple_token.aleo/transfer_public_to_private(
            self.signer, reedem_rec.amount
        ) then finalize(reedem_rec.turn, reedem_rec.id, reedem_rec.is_complete);
    }

    finalize claim_reward(turn:bool, game_id:u64, is_complete:bool){
        let game_info:GameInfo = Mapping::get(game_turn, game_id);
        assert(game_info.is_complete == is_complete);
        if game_info.is_complete==false{
            assert(turn==game_info.turn);
        }
        assert(block.height > game_info.deadline);
    }


    transition reveal(game_rec:Game, choice:u8, key:u128)-> (Reedem, Reedem){
        assert(game_rec.challenger_move == hash_choice(choice, key));
        let game_id:u64 = game_rec.id;
        let p1win:Reedem = Reedem{
            owner:game_rec.player1,
            id:game_rec.id,
            turn:true,
            amount:game_rec.each_stake+game_rec.each_stake,
            is_complete:true
        };
        let p2win:Reedem = Reedem{
            owner:game_rec.player2,
            id:game_rec.id,
            turn:false,
            amount:game_rec.each_stake+game_rec.each_stake,
            is_complete:true
        };
        let p1draw:Reedem = Reedem{
            owner:game_rec.player1,
            id:game_rec.id,
            turn:true,
            amount:game_rec.each_stake,
            is_complete:true
        };
        let p2draw:Reedem = Reedem{
            owner:game_rec.player2,
            id:game_rec.id,
            turn:false,
            amount:game_rec.each_stake,
            is_complete:true
        };
        let p1loss:Reedem = Reedem{
            owner:game_rec.player1,
            id:game_rec.id,
            turn:true,
            amount:0u64,
            is_complete:true
        };
        let p2loss:Reedem = Reedem{
            owner:game_rec.player2,
            id:game_rec.id,
            turn:false,
            amount:0u64,
            is_complete:true
        };
        if choice == 1u8{
            if game_rec.acceptor_move==1u8{
                return (p1draw, p2draw) 
                then finalize(game_id, false);
            }
            else if game_rec.acceptor_move==2u8{
                return (p1win, p2loss)
                then finalize(game_id, false);
            }
            else{
                return (p1loss, p2win) 
                then finalize(game_id, false);
            }  
        }
        else if choice == 2u8{
            if game_rec.acceptor_move==1u8{
                return (p1win, p2loss)
                then finalize(game_id, false);
            }
            else if game_rec.acceptor_move==2u8{
                return (p1draw, p2draw)
                then finalize(game_id, false);
            }
            else{
                return (p1loss, p2win)
                then finalize(game_id, false);
            }  
        }
        else if choice == 3u8{
            if game_rec.acceptor_move==1u8{
                return (p1loss, p2win)
                then finalize(game_id, false);
            }
            else if game_rec.acceptor_move==2u8{
                return (p1win, p2loss)
                then finalize(game_id, false);
            }
            else{
                return (p1draw, p2draw)
                then finalize(game_id, false);
            }  
        }
        return (p1draw, p2draw)
        then finalize(game_id, false);
    }
    finalize reveal (game_id:u64, turn:bool) {
        let game:GameInfo = Mapping::get(game_turn, game_id);
        let game_info:GameInfo = GameInfo{turn:true, deadline:game.deadline, is_complete:true};
        Mapping::set(game_turn, game_id, game_info);
        assert(turn==game_info.turn);
    }
}