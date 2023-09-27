exports.isString = (x) => {
    return (typeof x) == 'string';
};

exports.isHexString = (x) => {
    if (!this.isString(x)) { return false };

    let regex = /^[0-9A-Fa-f]{24}$/g;
    return x.match(regex);
};




