
export function formatNumber(value) {
    let valueAsString = value.toString();
    let output = valueAsString[0];
    for (let index = 1; index < valueAsString.length; ++index) {
        if ((valueAsString.length - index) % 3 === 0) {
            output += "\u00a0";
        }
        output += valueAsString[index];
    }
    return output;
}