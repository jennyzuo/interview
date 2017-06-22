
public class ForwardExceptionHandleStrategy {
	private final Worker worker;
	
	public ForwardExceptionHandleStrategy(Worker worker) {
		this.worker = worker;
	}
	
	public void handleError(Interfaces.ServerError e) {
		try {
			System.out.println("----server error, sleep 100, then try again-----");
			Thread.sleep(100);
		} catch (InterruptedException e1) {
			e1.printStackTrace();
		}
		worker.run();
	}
	
	public void handleError(Interfaces.NetWorkError e) {
		System.out.println("-----NetWork Error, stop forward request---------");
		Thread.interrupted();
	}
}