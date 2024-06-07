// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/*

 __    __  .___________. __  ___  __    __    ______   .___  ___.  _______ .______         _______ .___________. __    __  
|  |  |  | |           ||  |/  / |  |  |  |  /  __  \  |   \/   | |   ____||   _  \       |   ____||           ||  |  |  | 
|  |  |  | `---|  |----`|  '  /  |  |  |  | |  |  |  | |  \  /  | |  |__   |  |_)  |      |  |__   `---|  |----`|  |__|  | 
|  |  |  |     |  |     |    <   |  |  |  | |  |  |  | |  |\/|  | |   __|  |      /       |   __|      |  |     |   __   | 
|  `--'  |     |  |     |  .  \  |  `--'  | |  `--'  | |  |  |  | |  |____ |  |\  \----.__|  |____     |  |     |  |  |  | 
 \______/      |__|     |__|\__\  \______/   \______/  |__|  |__| |_______|| _| `._____(__)_______|    |__|     |__|  |__| 
                                                                                                                           
     ___          __  ___         ___                                                                                      
    /   \        |  |/  /        /   \                                                                                     
   /  ^  \       |  '  /        /  ^  \                                                                                    
  /  /_\  \      |    <        /  /_\  \                                                                                   
 /  _____  \   __|  .  \   __ /  _____  \                                                                                  
/__/     \__\ (__)__|\__\ (__)__/     \__\                                                                                 
                                                                                                                           
 __    __    ______    __  ___   ___    ___    _____                                                                       
|  |  |  |  /  __  \  |  |/  /  / _ \  |__ \  | ____|                                                                      
|  |  |  | |  |  |  | |  '  /  | (_) |    ) | | |__                                                                        
|  |  |  | |  |  |  | |    <    > _ <    / /  |___ \                                                                       
|  `--'  | |  `--'  | |  .  \  | (_) |  / /_   ___) |                                                                      
 \______/   \______/  |__|\__\  \___/  |____| |____/                                                                       
                                                                                                                           
*/

contract CheckInContract {
    struct User {
        uint256 points;
        uint256 lastCheckIn;
    }

    mapping(address => User) private users;
    uint256 private checkInInterval = 24 hours;
    uint256 private pointsPerCheckIn = 5;

    event CheckIn(address indexed user, uint256 points, uint256 time);

    function checkIn() public {
        User storage user = users[msg.sender];
        require(
            block.timestamp >= user.lastCheckIn + checkInInterval,
            "You can only check in once every 24 hours."
        );

        user.points += pointsPerCheckIn;
        user.lastCheckIn = block.timestamp;

        emit CheckIn(msg.sender, user.points, block.timestamp);
    }

    function getPoints(address userAddress) public view returns (uint256) {
        return users[userAddress].points;
    }

    function getLastCheckIn(address userAddress) public view returns (uint256) {
        return users[userAddress].lastCheckIn;
    }
}
