public class Utils {
	private static String REST_URL = "https://spreadfast.com/%d/event";
	public static void postCustomerData(long customerId, String data) throws Interfaces.ServerError, 
	Interfaces.NetWorkError {
		System.out.println("posting customer event to " + String.format(REST_URL, customerId));
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		double random = Math.random();
		if (random < 0.7 && random > 0.5) {
			throw new Interfaces.ServerError();
		} else if (random > 0.7) {
			throw new Interfaces.NetWorkError();
		} else {
			System.out.println("Send " + customerId + " data " + data + " successfully");
		}
	}
}
