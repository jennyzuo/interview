import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;


/*Design a store-and-forward system that receives events for many customers in our system. 
 * The event is represented by { customer_id, data }. 
 * We need to send this data to each customer via a REST API call to their server. 
 * Order must be maintained for messages to a given customer. 
 * The solution needs to be scalable and it must tolerate some reasonable number of network or service errors 
 * from the customers REST service (that is, it should retry if the service is temporarily unavailable, 
 * but give up if it is permanently unavailable). 
 * Talk a little on how you might deploy this in a fault tolerant way.
Code as little or as much as you like here to demonstrate your design.
*/
public class StoreAndForwardSystem {
	private final Store store;
	private final Interfaces.MessageBroker broker;
	private Set<Long> customers = new HashSet<Long>();
	ThreadPoolExecutor executor = (ThreadPoolExecutor) Executors.newCachedThreadPool();
	
	public StoreAndForwardSystem(Store store, Interfaces.MessageBroker messageBroker) {
		this.store = store;
		this.broker = messageBroker;
	}
	public void start() {
		while (broker.hasNext()) {
			CustomerEvent event = broker.next();
			long customerId = event.customerId();
			store.storeData(customerId, event.data());
			if (!this.customers.contains(customerId)) {
				Worker worker = new Worker(customerId, this.store);
				executor.submit(worker) ;
				this.customers.add(customerId);
			}
		}
		try {
			Thread.sleep(3000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		this.executor.shutdownNow();
		System.exit(0);
	}	
		
	public static void main(String[] args) {	
		Store store = new InMemoryStore();
		Interfaces.MessageBroker broker = new KafakaMessageBroker();
		StoreAndForwardSystem system = new StoreAndForwardSystem(store, broker);
		system.start();
	}	
}