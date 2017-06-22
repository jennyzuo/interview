
interface Store {
	public boolean storeData(long customerId, String data);
	public String fetchCustomerData(long customerId);
}