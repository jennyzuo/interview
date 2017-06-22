public class Worker implements Runnable  {
	private final long customerId;
	private String data;
	private final Store store;
	private final ForwardExceptionHandleStrategy strategy;
	public Worker(long customerId, Store store) {
		this.customerId = customerId;
		this.store = store;
		this.strategy = new ForwardExceptionHandleStrategy(this);
	}
	private void fetchCustomerData() {
		this.data = store.fetchCustomerData(this.customerId);
	}
	private void postCustomerEvent() throws Interfaces.ServerError, Interfaces.NetWorkError {
		if (this.data != null) {
			Utils.postCustomerData(this.customerId, this.data);				
		}
	}
	public void run() {
		while (!Thread.interrupted()) {
			if (this.data == null) {
				this.fetchCustomerData();
			}
			try {
				this.postCustomerEvent();
				this.data = null;
			} catch(Interfaces.ServerError e) {
				this.strategy.handleError(e);
			} catch (Interfaces.NetWorkError e) {
				this.strategy.handleError(e);
			}catch(Exception e) {     Thread.currentThread().interrupt();
}
		}
	}
}
