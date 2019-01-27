const sampleData ={
    experiences: {
        experience1: {id:'experience1',content:'take out the garbage again and again. it never gets done. '},
        experience2: {id:'experience2',content:'watch fav show. which is friends'},
        experience3: {id:'experience3',content:'charge phone'},
        experience4: {id:'experience4',content:'cook dinnere'},
        experience5: {id:'experience5',content:'clean up'},
        experience6: {id:'experience6',content:'work on app'},
        experience7: {id:'experience7',content:'go to bjj'},
    },
    columns: {
        'col-1': {id: 'col-1',title:'To do',experienceIds:['experience1','experience2','experience3','experience4']},
        'col-2': {id: 'col-2',title:'In progress',experienceIds:['experience5']},
        'col-3': {id: 'col-3',title:'Done',experienceIds:['experience6']},
        'col-4': {id: 'col-4',title:'Limbo',experienceIds:['experience7']},
        'col-5': {id: 'col-5',title:'Maybe',experienceIds:[]},
    },
    colOrder: ['col-1','col-2','col-3','col-4','col-5'],
};

export default sampleData;