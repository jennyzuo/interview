public class KafakaMessageBroker implements Interfaces.MessageBroker {
	
	private String[] mockStream = new String[]{"123, AAAAAA", 
			"234, BBBBBB", "123, CCCCCC", "123, DDDDDD", "234, EEEEEEE", "567, FFFFFFFFF", 
			"123, GGGGGG", "234, HHHHHHH", "567, IIIIIIIII"};
	private int i = 0;
	
	@Override
	public boolean hasNext() {
		return this.i != mockStream.length;
	}

	@Override
	public CustomerEvent next() {	
		return CustomerEvent.parseEvent(this.mockStream[this.i++]);
	}
}