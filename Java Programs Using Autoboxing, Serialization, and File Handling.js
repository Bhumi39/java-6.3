import java.io.*;
import java.util.*;

// ---------- Student Class (for Serialization) ----------
class Student implements Serializable {
    int id;
    String name;
    double marks;

    Student(int id, String name, double marks) {
        this.id = id;
        this.name = name;
        this.marks = marks;
    }

    @Override
    public String toString() {
        return id + " - " + name + " - " + marks;
    }
}

// ---------- Employee Class (for File Handling) ----------
class Employee {
    int id;
    String name;
    double salary;

    Employee(int id, String name, double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    @Override
    public String toString() {
        return id + " - " + name + " - " + salary;
    }
}

// ---------- Main Class ----------
public class Exp2_2_Autoboxing_Serialization_FileHandling {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("=== PBLJ EXP 2.2 ===");
        System.out.println("1. Sum of Integers Using Autoboxing and Unboxing");
        System.out.println("2. Serialization and Deserialization of a Student Object");
        System.out.println("3. Employee Management System Using File Handling");
        System.out.print("Enter your choice (1-3): ");
        int choice = sc.nextInt();

        switch (choice) {
            case 1:
                partA_SumAutoboxing();
                break;
            case 2:
                partB_Serialization();
                break;
            case 3:
                partC_FileHandling();
                break;
            default:
                System.out.println("Invalid Choice!");
        }

        sc.close();
    }

    // ---------- PART A: Autoboxing & Unboxing ----------
    public static void partA_SumAutoboxing() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number of integers: ");
        int n = sc.nextInt();

        Integer sum = 0;  // Autoboxing from int to Integer
        for (int i = 0; i < n; i++) {
            System.out.print("Enter integer " + (i + 1) + ": ");
            int num = sc.nextInt();
            sum += num; // Unboxing and Autoboxing occur here automatically
        }

        System.out.println("Sum of integers: " + sum);
    }

    // ---------- PART B: Serialization & Deserialization ----------
    public static void partB_Serialization() {
        Scanner sc = new Scanner(System.in);
        try {
            System.out.print("Enter Student ID: ");
            int id = sc.nextInt();
            sc.nextLine();
            System.out.print("Enter Student Name: ");
            String name = sc.nextLine();
            System.out.print("Enter Marks: ");
            double marks = sc.nextDouble();

            Student s1 = new Student(id, name, marks);

            // Serialization
            FileOutputStream fos = new FileOutputStream("student.ser");
            ObjectOutputStream oos = new ObjectOutputStream(fos);
            oos.writeObject(s1);
            oos.close();
            fos.close();
            System.out.println("Student object serialized successfully.");

            // Deserialization
            FileInputStream fis = new FileInputStream("student.ser");
            ObjectInputStream ois = new ObjectInputStream(fis);
            Student s2 = (Student) ois.readObject();
            ois.close();
            fis.close();

            System.out.println("Deserialized Student Object:");
            System.out.println(s2);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // ---------- PART C: Employee Management with File Handling ----------
    public static void partC_FileHandling() {
        Scanner sc = new Scanner(System.in);
        File file = new File("employees.txt");

        try {
            boolean exit = false;
            while (!exit) {
                System.out.println("\n--- Employee Management Menu ---");
                System.out.println("1. Add Employee");
                System.out.println("2. View All Employees");
                System.out.println("3. Search Employee by ID");
                System.out.println("4. Exit");
                System.out.print("Enter choice: ");
                int ch = sc.nextInt();
                sc.nextLine();

                switch (ch) {
                    case 1:
                        System.out.print("Enter Employee ID: ");
                        int id = sc.nextInt();
                        sc.nextLine();
                        System.out.print("Enter Employee Name: ");
                        String name = sc.nextLine();
                        System.out.print("Enter Salary: ");
                        double sal = sc.nextDouble();
                        sc.nextLine();

                        Employee e = new Employee(id, name, sal);
                        FileWriter fw = new FileWriter(file, true);
                        BufferedWriter bw = new BufferedWriter(fw);
                        bw.write(e.id + "," + e.name + "," + e.salary);
                        bw.newLine();
                        bw.close();
                        System.out.println("Employee Added Successfully.");
                        break;

                    case 2:
                        if (file.exists()) {
                            BufferedReader br = new BufferedReader(new FileReader(file));
                            String line;
                            System.out.println("\n--- Employee List ---");
                            while ((line = br.readLine()) != null) {
                                String[] data = line.split(",");
                                System.out.println("ID: " + data[0] + ", Name: " + data[1] + ", Salary: " + data[2]);
                            }
                            br.close();
                        } else {
                            System.out.println("No employee data found.");
                        }
                        break;

                    case 3:
                        System.out.print("Enter Employee ID to Search: ");
                        int searchId = sc.nextInt();
                        boolean found = false;
                        if (file.exists()) {
                            BufferedReader br2 = new BufferedReader(new FileReader(file));
                            String line2;
                            while ((line2 = br2.readLine()) != null) {
                                String[] data = line2.split(",");
                                if (Integer.parseInt(data[0]) == searchId) {
                                    System.out.println("Employee Found: " + data[1] + " - Salary: " + data[2]);
                                    found = true;
                                    break;
                                }
                            }
                            br2.close();
                        }
                        if (!found) System.out.println("Employee not found!");
                        break;

                    case 4:
                        exit = true;
                        System.out.println("Exiting Employee Management System...");
                        break;

                    default:
                        System.out.println("Invalid choice!");
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
