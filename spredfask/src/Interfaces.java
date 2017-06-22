import java.util.Iterator;

public final class Interfaces {
	interface MessageBroker extends Iterator<CustomerEvent>{};
	static class ServerError extends Exception {};
	static class NetWorkError extends Exception {};
}