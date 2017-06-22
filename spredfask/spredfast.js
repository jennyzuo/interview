class Developer {
    constructor(programmingLanguages) {
        this.programmingLanguages = programmingLanguages.slice();
    }
    getProgrammingLanguages() {
        return this.programmingLanguages;
    }
}

const getProgrammingLanguages = developers => {
    return developers.reduce((acc, developer) => {
        return new Set([...developer.getProgrammingLanguages(), ...acc]);
    }, new Set());
};

getProgrammingLanguages([new Developer(['PHP', 'Java', 'Bash']), new Developer(['Java', 'Python']),
    new Developer(['JavaScript', 'TypeScript', 'Python'])]).forEach(language => console.log(language));


console.log('-------------------------');

const convert2Title = n => {
    if (n >= 0) {
        let ret = [String.fromCharCode(65 + n % 26)];
        n = Math.floor(n / 26);
        while (n > 0) {
            ret.push(String.fromCharCode(65 + (n - 1) % 26));
            n = Math.floor((n - 1) / 26);
        }
        return ret.reverse().join('');
    }
};
[0, 25, 702, 18277, 18278].map(n => `${n} excel title is ${convert2Title(n)}`)
    .map(line => console.log(line));