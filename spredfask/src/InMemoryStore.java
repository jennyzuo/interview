import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;

public class InMemoryStore implements Store {
	Map<Long, Queue<String>> events = new HashMap<>();

	@Override
	public boolean storeData(long customerId, String data) {
		if (!events.containsKey(customerId)) {
			events.put(customerId, new LinkedList<String>());
		}
		return events.get(customerId).offer(data);
	}

	@Override
	public String fetchCustomerData(long customerId) {
		Queue<String> data = this.events.get(customerId);
		return data == null ? null : data.poll();
	}
}