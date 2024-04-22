declare class IProblem {
    pid = ``
    title = ``
    author = `cn_ryh`
    difficult = 0
    TimeLimit = 1000
    MemoryLimit = 512
    description = ''
    descriptionmd = ''
    datanumber = 0;
    /**
     * @constructor
     * @param {IProblem} initProblem 初始化的值
     */
    constructor(initProblem: IProblem) {
        for (const now in initProblem) {
            this[now] = initProblem[now];
        }
    }
}

declare class INetcut {
    paths: string = ``;
    value: string = ``;
    password: string = null;
    creater: number = 0;
    createTime: number = 0;
    updateTime: number = 0;
    edit: boolean = false;
}