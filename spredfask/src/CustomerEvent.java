public class CustomerEvent {
	private final long customerId;
	private final String data;
	
	public static CustomerEvent parseEvent(String str) {
		String[] parsed = str.split(",");
		return new CustomerEvent(Long.parseLong(parsed[0]), parsed[1]);
	}
	
	public long customerId() {
		return this.customerId;
	}
	
	public String data() {
		return this.data;
	}
	
	public CustomerEvent(long customerId, String data) {
		this.customerId = customerId;
		this.data = data;
	}
}
