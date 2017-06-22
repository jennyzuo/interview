/*
public class Developer {  
   public Collection<String> getProgrammingLanguages();
}
A developer can know one or more programming languages. If I have a group of developers:
Collection<Developer> developers;
at my company, what is a good way to get a list of the distinct programming languages people know at my company. 
Present output as a collection.
For example if Developer 1 knows { "PHP", "Java", "Bash" } and Developer 2 knows {"Java", "Python"} 
the result would be {"PHP", "Java", "Bash", "Python"}. Order is not important.
 * */
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.stream.Stream;

public class Developer {
	private String[] programmingLanguage;
	public Developer(String[] programmingLanguage) {
		this.programmingLanguage = Arrays.copyOfRange(programmingLanguage, 0, programmingLanguage.length);
	}
	
	public Collection<String> getProgrammingLanguages() {
		return Arrays.asList(this.programmingLanguage);
	}
	
	public static Collection<String> getAllProgrammingLanguage(Collection<Developer> developers) {
		return developers.stream()
				         .flatMap(developer -> Stream.of(developer.getProgrammingLanguages()))
                         .reduce(new HashSet<>(), (acc, programmingLanguage) -> {
                        	 acc.addAll(programmingLanguage);
                        	 return acc;
                         });
	}
	
	public static void main(String[] args) {
		Developer d1 = new Developer(new String[]{"PHP", "Java", "Bash"});
		Developer d2 = new Developer(new String[]{"Java", "Python"});
		Developer d3 = new Developer(new String[]{"JavaScript", "TypeScript"});
		Collection<Developer> developers = Arrays.asList(d1, d2, d3);	
		
		Collection<String> languages = Developer.getAllProgrammingLanguage(developers);
		languages.forEach(System.out::println);
	}
}