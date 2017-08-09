class Developer {
    private programmingLanguages;
	
    constructor(programmingLanguages) {
        this.programmingLanguages = programmingLanguages.slice();
	}

    public getProgrammingLanguages() {
		return this.programmingLanguages;
	}
}
const getProgrammingLanguages = developers => {
        return developers.reduce((acc, developer) => {
            return new Set([...developer.getProgrammingLanguages(), ...acc]);
        }, new Set());
	};

const developers = [new Developer(['PHP', 'Java', 'Bash']), new Developer(['Java', 'Python']),
                    new Developer(['JavaScript', 'TypeScript', 'Python'])];

getProgrammingLanguages(developers).forEach(language => console.log(language));

console.log('-------------------------');
const convert2Title = n => {
    if (n >= 0) {
        let ret = [String.fromCharCode(65 + n % 26)];
        n = Math.floor(n/26);
        while (n > 0) {
            ret.push(String.fromCharCode(65 + (n - 1)%26));
            n = Math.floor((n - 1)/26);
        }
        return ret.reverse().join('');
    }
};
[702, 18277, 18278].map(n => `${n} excel title is ${convert2Title(n)}`)
                   .map(line => console.log(line));
