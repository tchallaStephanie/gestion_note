export default function* uuid(start_index){

    //const fruits=["mangue","banane","fraise"]
    let i=start_index;
    while (true) {
        yield i++;
    }   

    /*for (let index = 0; index < 10; index++) {
        yield index
    }*/



    /*console.log("hello my familly");
    yield "hello";
    console.log("hello my familly");*/

}
/*const uuidgen=uuid();
console.log(uuidgen.next());
console.log(uuidgen.next());
*/

