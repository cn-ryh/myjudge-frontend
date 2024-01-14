import { ip } from "@/ip";
import axio from "axios";
class Problem {
    pid = ``;
    title = ``;
    description = ``;
    author = ``;
    difficlut = 0;
    Problem(pid = ``, title = ``, description = ``, author = ``, difficlut = 0) {
        this.pid = pid;
        this.title = title;
        this.description = description;
        this.author = author;
        this.difficlut = difficlut;
    }
}
/**
 * 
 * @returns {Promise<Problem[]>} 从服务器获取到的题目列表
 */
async function getProblem() {
    let problems;
    await axio.get(`${ip}/getProblemList/`).then(
        (res) => {
            problems = res.data.problems;
        }
    );

    return new Promise((resolve, reject) => {
        //调用resolve函数返回数据data
        resolve(problems);
    });
}
export { getProblem }