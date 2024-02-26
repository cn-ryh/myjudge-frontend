export const State = {
    "Accept": Symbol("Accept"),
    "Wrong Answer": Symbol("Wrong Answer"),
    "Time Limit Error": Symbol("Time Limit Error"),
    "Merory Limit Error": Symbol("Merory Limit Error"),
    "Unknow Error": Symbol("Unknow Error")
}


export class JudgePoint {
    index
    state
    time
    merory
}

export class Record {
    id
    state
    time
    merory
    detail
}