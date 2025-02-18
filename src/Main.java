import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        File words = new File("5_letters.csv");
        Scanner file;
        try {
            file = new Scanner(words);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }

        file.nextLine();
        ArrayList<String> listWords = new ArrayList<>();
        ArrayList<String> alreadyTested = new ArrayList<>();
        while (file.hasNextLine()) {
            String word = file.nextLine().replace(",", "");
            listWords.add(word);
        }

       // int index = (int) (Math.random() * listWords.size());
        int index = 0;
        String currentWord = listWords.get(index);
        listWords.remove(currentWord);
        alreadyTested.add(currentWord);

        System.out.println(ConsoleColors.RESET + "Guess the wordle for today:");

        URL url = null;
        try {
            url = new URL("https://www.dictionaryapi.com/api/v3/references/thesaurus/json/umpire?key=your-api-key");
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
        String dictionary = stream(url);
        System.out.println(dictionary);

        /*
        boolean found = false;
        for (int j = 0; j < 6; j++) {
            Scanner input = new Scanner(System.in);

            String userGuess = input.nextLine();

            if (userGuess.equals(currentWord)) {
                System.out.println(ConsoleColors.GREEN + userGuess);
                System.out.println(ConsoleColors.RESET + "Solved!");
                found = true;
                break;
            } else {
                for (int i = 0; i < 5; i++) {
                    if (currentWord.contains(userGuess.substring(i, i + 1))) {
                        if (currentWord.charAt(i) == userGuess.charAt(i)) {
                            System.out.print(ConsoleColors.GREEN + userGuess.charAt(i));
                        } else {
                            System.out.print(ConsoleColors.YELLOW + userGuess.charAt(i));
                        }
                    }
                    else {
                        System.out.print(ConsoleColors.RESET + userGuess.charAt(i));
                    }
                }
                System.out.println("\n" + ConsoleColors.RESET + "Try again");
            }
        }
        if (!found) {
            System.out.println(ConsoleColors.RESET + "Today's wordle: " + currentWord);
        }

         */

    }

    public static String stream(URL url) {
        StringBuilder json;
        try (InputStream input = url.openStream()) {
            InputStreamReader isr = new InputStreamReader(input);
            BufferedReader reader = new BufferedReader(isr);
            json = new StringBuilder();
            int c;
            while ((c = reader.read()) != -1) {
                json.append((char) c);
            }
            return json.toString();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}