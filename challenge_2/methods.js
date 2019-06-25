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

    output.push(keyParser(input));
    // console.log(output);
    return output.join('\n');
}

const keyParser = (obj) => {
    const output = []
    const oneLine = [];
    for (let keys in obj) {
        if (keys !== 'children') {
            oneLine.push(obj[keys])
        }
    }
    output.push(oneLine.join(' '));
    for (let i = 0; i < obj.children.length; i ++) {
        output.push(keyParser(obj.children[i]));
    }
    return output.join('\n');
}