export class OutsideCallStackRunnerService {
    static execute(callback: () => void) {
        setTimeout(callback, 0)
    }
}