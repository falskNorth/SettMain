import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class Watch2gether extends JFrame {
    private JTextField itemInputField;
    private JButton addButton;
    private JButton selectButton;
    private JButton removeButton; // BUTTON TO REMOVE SELECTED ITEM
    private JTextArea itemDisplayArea;
    private JTextField currentlyWatchingField; // FIELD FOR CURRENTLY WATCHING
    private List<String> items;
    private static final String FILE_NAME = "items.txt";
    private static final String CURRENTLY_WATCHING_FILE = "currently_watching.txt"; // FILE TO SAVE CURRENTLY WATCHING

    public Watch2gether() {
        setTitle("Watch2gether");
        setSize(700, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        items = new ArrayList<>();

        // INITIALIZE THE CURRENTLY WATCHING FIELD BEFORE LOADING
        currentlyWatchingField = new JTextField(30); // FIELD FOR CURRENTLY WATCHING
        currentlyWatchingField.setEditable(true); // ALLOW EDITING OF CURRENTLY WATCHING

        loadItemsFromFile(); // LOAD ITEMS FROM THE FILE WHEN THE APPLICATION STARTS
        loadCurrentlyWatching(); // LOAD CURRENTLY WATCHING ITEM

        itemInputField = new JTextField(20);
        addButton = new JButton("Add Item");
        selectButton = new JButton("Select Random Item");
        removeButton = new JButton("Remove Selected Item");
        itemDisplayArea = new JTextArea(10, 30);
        itemDisplayArea.setEditable(false); // MAKE THE TEXT AREA READ-ONLY
        JScrollPane scrollPane = new JScrollPane(itemDisplayArea); // ADD SCROLL PANE FOR BETTER VISIBILITY

        addButton.addActionListener(new AddItemAction());
        selectButton.addActionListener(new SelectItemAction());
        removeButton.addActionListener(new RemoveItemAction());

        JPanel inputPanel = new JPanel();
        inputPanel.add(itemInputField);
        inputPanel.add(addButton);
        inputPanel.add(selectButton);
        inputPanel.add(removeButton);

        setLayout(new FlowLayout());
        add(inputPanel);
        add(scrollPane); // ADD THE SCROLL PANE CONTAINING THE TEXT AREA

        // ADD LABEL AND CURRENTLY WATCHING FIELD
        JPanel currentlyWatchingPanel = new JPanel();
        currentlyWatchingPanel.setLayout(new BoxLayout(currentlyWatchingPanel, BoxLayout.Y_AXIS)); // USE VERTICAL LAYOUT
        currentlyWatchingPanel.add(new JLabel("Currently Watching:")); // ADD LABEL
        currentlyWatchingPanel.add(currentlyWatchingField); // ADD THE CURRENTLY WATCHING FIELD

        // ADD ADDITIONAL TEXT BELOW THE CURRENTLY WATCHING FIELD
        JLabel additionalTextLabel = new JLabel("MUST WATCH IN APRIL: Your Lie in April"); // ADDITIONAL TEXT
        currentlyWatchingPanel.add(additionalTextLabel); // ADD THE ADDITIONAL TEXT LABEL

        add(currentlyWatchingPanel); // ADD THE PANEL TO THE FRAME

        updateItemDisplay(); // DISPLAY LOADED ITEMS
    }

    private class AddItemAction implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            String input = itemInputField.getText().trim();
            if (!input.isEmpty() && !items.contains(input)) {
                items.add(input);
                itemInputField.setText("");
                updateItemDisplay();
                saveItemsToFile(); // SAVE ITEMS TO THE FILE
                JOptionPane.showMessageDialog(Watch2gether.this, "Item added: " + input);
            } else {
                JOptionPane.showMessageDialog(Watch2gether.this, "Please enter a unique item.");
            }
        }
    }

    private class SelectItemAction implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            if (items.isEmpty()) {
                JOptionPane.showMessageDialog(Watch2gether.this, "No items to select from!");
                return;
            }

            Random random = new Random();
            String selectedItem = items.get(random.nextInt(items.size()));
            currentlyWatchingField.setText(selectedItem); // UPDATE CURRENTLY WATCHING
            saveCurrentlyWatching(selectedItem); // SAVE CURRENTLY WATCHING TO FILE
            JOptionPane.showMessageDialog(Watch2gether.this, "Selected Item: " + selectedItem);
        }
    }

    private class RemoveItemAction implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            String itemToRemove = currentlyWatchingField.getText().trim();
            if (items.remove(itemToRemove)) {
                updateItemDisplay();
                saveItemsToFile(); // SAVE UPDATED ITEMS TO THE FILE
                JOptionPane.showMessageDialog(Watch2gether.this, "Removed item: " + itemToRemove);
            } else {
                JOptionPane.showMessageDialog(Watch2gether.this, "Item not found in the list.");
            }
        }
    }

    private void updateItemDisplay() {
        itemDisplayArea.setText(""); // CLEAR THE TEXT AREA
        for (String item : items) {
            itemDisplayArea.append(item + "\n"); // APPEND EACH ITEM TO THE TEXT AREA
        }
    }

    private void loadItemsFromFile() {
        try (BufferedReader reader = new BufferedReader(new FileReader(FILE_NAME))) {
            String line;
            while ((line = reader.readLine()) != null) {
                items.add(line);
            }
        } catch (IOException e) {
            // HANDLE THE EXCEPTION (E.G., FILE NOT FOUND)
            System.err.println("Error loading items: " + e.getMessage());
        }
    }

    private void saveItemsToFile() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_NAME))) {
            for (String item : items) {
                writer.write(item);
                writer.newLine();
            }
        } catch (IOException e) {
            // HANDLE THE EXCEPTION
            System.err.println("Error saving items: " + e.getMessage());
        }
    }

    private void loadCurrentlyWatching() {
        try (BufferedReader reader = new BufferedReader(new FileReader(CURRENTLY_WATCHING_FILE))) {
            String line = reader.readLine();
            if (line != null) {
                currentlyWatchingField.setText(line); // SET THE CURRENTLY WATCHING FIELD
            }
        } catch (IOException e) {
            // HANDLE THE EXCEPTION (E.G., FILE NOT FOUND)
            System.err.println("Error loading currently watching: " + e.getMessage());
        }
    }

    private void saveCurrentlyWatching(String currentlyWatching) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(CURRENTLY_WATCHING_FILE))) {
            writer.write(currentlyWatching);
        } catch (IOException e) {
            // HANDLE THE EXCEPTION
            System.err.println("Error saving currently watching: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            Watch2gether watch2gether = new Watch2gether();
            watch2gether.setVisible(true);
        });
    }
}