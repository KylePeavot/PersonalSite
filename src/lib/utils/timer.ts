//To time how long a given function takes to execute
export function timer(fn: () => unknown) {
    const startTime = new Date();

    fn()

    const endTime = new Date();

    console.log(`~ ${(+endTime - +startTime)} milliseconds`);
}