const printLevel = (subs, boss, level) => {
    let {name, title, join} = boss;
    console.log('-'.repeat(level) + `${name} (${title}) (${join})` );
    const allsubs = subs[boss.name];
    if (allsubs) {
        allsubs.sort((a, b) => a.name > b.name);
        allsubs.forEach(sub => printLevel(subs, sub, level + 1));
    }
};
const printOrgization = line => {
    const subs = {};
    let ceo;
    line.split('--').forEach(people => {
        let [name, boss, title, join] = people.split(',');
        if (boss === 'NULL') ceo = {name, title, join};
        else {
            subs[boss] = subs[boss] || [];
            subs[boss].push({name, title, join});
        }
    });
    let level = 0;
    printLevel(subs, ceo, level);
};

printOrgization('Fred,Karl,Technician,2010--Karl,Cathy,VP,2009--Cathy,NULL,CEO,2007');
/*Fred,Karl,Technician,2010--Karl,Cathy,VP,2009--Cathy,NULL,CEO,2007 
Cathy (CEO) 2007
-Karl (VP) 2009
--Fred (Technician) 2010*/
console.log('----------');
printOrgization('Adam,Karl,Technician,2010--Bob,Karl,Technician,2012--Cathy,Karl,Technician,2013--Karl,Nancy,Manager,2009--Wendy,Nancy,Technician,2012--Nancy,NULL,CEO,2007');
/*Nancy (CEO) 2007
-Karl (Manager) 2009  
--Adam (Technician) 2010
--Bob (Technician) 2012
--Cathy (Technician) 2013
-Wendy (Technician) 2012
*/