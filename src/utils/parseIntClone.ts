export function myParseInt(str: string): number {
    let result = 0;
    
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        
        if (charCode >= 48 && charCode <= 57) {
            result = result * 10 + (charCode - 48);
        } else {
            break;
        }
    }
    
    return result;
}
