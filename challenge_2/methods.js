module.exports.modelJSON = (input) => {
    input = JSON.parse(input);
    const output = [];
    let header = [];
    for (let keys in input) {
        if (keys !== 'children') {
            header.push(keys);
        }
    }
    output.push(header.join(' '));

    const item = []
    for (let keys in input) {
            if (keys !== 'children') {
                item.push(input[keys]);
            }
    }
    output.push(item.join(' '));
    // console.log(output);
    return output.join('\n');
}