/**
 * @param {string} instructions
 * @return {boolean}
 */
 let isRobotBounded = function(instructions) {
    let directions = {
        0: [0, 1], // Up
        1: [1, 0], // Right
        2: [0, -1], // Down
        3: [-1, 0] // Left
    };
    
    let position = [0, 0];
    let orientation = 0;
    for (let instruction of instructions) {
        if (instruction == 'G') {
            position[0] += directions[orientation][0]; // X
            position[1] += directions[orientation][1]; // Y
        } else if (instruction == 'L') {
            // +3 because we want to go left. %4 to keep it inbounds
            orientation = (orientation + 3) % 4;
        } else {
            // +1 because we want to go right. %4 to keep it inbounds
            orientation = (orientation + 1) % 4;
        }
    }
    return (position[0] == 0 && position[1] == 0) || orientation != 0;
};