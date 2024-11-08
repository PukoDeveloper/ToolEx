class Utils {
    constructor() {
        if (new.target === Utils) {
            throw new TypeError("Cannot construct Utils instances.");
        }
    }
    
}