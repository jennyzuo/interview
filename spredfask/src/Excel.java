import java.util.Arrays;

/*Consider the Excel spreadsheet. How does it know how to label the columns? 
 * Given the column number (starting from zero) produce the label for the column.
For example "A", "B", "C" ... "YY", "ZZ"
*/

public class Excel {
	public static String convert2Title(int n) {
		StringBuilder sb = new StringBuilder();
		if (n >= 0) {
			sb.append((char)('A' + n % 26));
			n /= 26;
			while (n > 0) {
				sb.append((char)('A' + (n - 1) % 26));
				n = (n - 1) / 26;
			}
		}
		return sb.reverse().toString();
	}	
	public static void main(String[] args) {
		Arrays.asList(702, 18277, 18278).stream()
			  .map(n -> String.format("%d excel label is %s", n, convert2Title(n)))
			  .forEach(System.out::println);
	}
}