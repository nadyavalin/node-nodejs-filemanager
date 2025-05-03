# File Manager

## Description

This is a Node.js-based File Manager that provides a Command Line Interface (CLI) for performing file and directory operations, retrieving operating system information, calculating file hashes, and compressing/decompressing files using the Streams API.

## Technical Requirements

- **Node.js Version**: Uses Node.js 22.x.x (22.14.0 or higher).
- **Dependencies**: No external dependencies required.

## Start Command:

Run the program using the following npm script:

`npm run start -- --username=your_username`

Replace `your_username` with your preferred username.

## Usage

### Starting the Program

- Execute the start command with a username:
  ```
  npm run start -- --username=Alex
  ```
- Upon starting, the program displays:
  ```
  Welcome to the File Manager, Alex!
  You are currently in C:\Users\Alex
  Type a command (or .exit to quit):
  ```
  - The initial working directory is the user's home directory (e.g., `/home/user` on Unix-like systems or `C:\Users\Username` on Windows).

### Exiting the Program

- Exit the program by pressing `Ctrl + C` or typing `.exit`.
- Upon exit, the program displays:
  ```
  Thank you for using File Manager, Alex, goodbye!
  ```

### Working Directory

- The current working directory is displayed after each command or operation:
  ```
  You are currently in C:\Users\Alex
  ```
- The program prevents navigation above the root directory (e.g., local drive root on Windows).

### Command Input

- Enter commands in the console and press `Enter` to execute.
- Invalid input or unknown operations result in:
  ```
  Invalid input
  ```
- Operation failures (e.g., non-existent file) result in:
  ```
  Operation failed
  ```
- Users can enter another command after any error.

## Available Commands

### Navigation & Working Directory

- **Go up one directory level**
  - Command: `up`
  - Description: Moves to the parent directory. No change if already at root.
- **Change directory**
  - Command: `cd path_to_directory`
  - Example: `cd documents` or `cd C:\Users\Alex\documents`
  - Description: Changes to the specified directory (relative or absolute path).
- **List directory contents**
  - Command: `ls`
  - Description: Lists all files and folders in the current directory:
    - Sorted alphabetically, folders first.
    - Includes file/folder names (with extensions for files) and type indication.
    - Example output:

      ![image](https://github.com/user-attachments/assets/35e1e566-5596-4e1a-a8ba-a8501b9a470d)

### Basic File Operations

- **Read file content**
  - Command: `cat path_to_file`
  - Example: `cat file.txt`
  - Description: Reads and prints the file content using Readable stream.
- **Create empty file**
  - Command: `add new_file_name`
  - Example: `add newfile.txt`
  - Description: Creates an empty file in the current directory.
- **Create new directory**
  - Command: `mkdir new_directory_name`
  - Example: `mkdir newdir`
  - Description: Creates a new directory in the current directory.
- **Rename file**
  - Command: `rn path_to_file new_filename`
  - Example: `rn oldfile.txt newfile.txt`
  - Description: Renames the file, preserving its content.
- **Copy file**
  - Command: `cp path_to_file path_to_new_directory`
  - Example: `cp file.txt backup\` or `cp file.txt C:\Users\Alex\backup\`
  - Description: Copies the file to the specified directory using Readable and Writable streams.
- **Move file**
  - Command: `mv path_to_file path_to_new_directory`
  - Example: `mv file.txt archive\` or `mv file.txt C:\Users\Alex\archive\`
  - Description: Moves the file to the specified directory (copies then deletes original) using streams.
- **Delete file**
  - Command: `rm path_to_file`
  - Example: `rm file.txt`
  - Description: Deletes the specified file.

### Operating System Information

- **Get End-Of-Line (EOL)**
  - Command: `os --EOL`
  - Description: Prints the default system EOL (e.g., `\n` or `\r\n`).
  - Example output:
    ```
    Default system End-Of-Line (EOL): \r\n (CRLF)
    ```

- **Get CPU information**
  - Command: `os --cpus`
  - Description: Prints the total number of CPUs and model/clock rate for each.
  - Example output:
    ```
    Total CPUs: 4
    1. Model: Intel(R) Core(TM) i5-8250U, Clock Speed: 1.60 GHz
    2. Model: Intel(R) Core(TM) i5-8250U, Clock Speed: 1.60 GHz
    ...
    ```
- **Get home directory**
  - Command: `os --homedir`
  - Description: Prints the user's home directory path.
  - Example output:
    ```
    Home directory: C:\Users\Alex
    ```

- **Get system username**
  - Command: `os --username`
  - Description: Prints the current system username (not the startup username).
  - Example output:
    ```
    System username: Alex
    ```

- **Get CPU architecture**
  - Command: `os --architecture`
  - Description: Prints the CPU architecture for which Node.js was compiled (e.g., `x64`, `arm`).
  - Example output:
    ```
    CPU architecture: x64
    ```

### Hash Calculation

- **Calculate file hash**
  - Command: `hash path_to_file`
  - Example: `hash file.txt`
  - Description: Calculates and prints the MD5 hash of the file.
  - Example output:
    ```
    MD5 hash for test.txt: 4d3116d5a888e2d77ad0156f25bdd593
    ```

### Compress and Decompress Operations

- **Compress file**
  - Command: `compress path_to_file path_to_destination`
  - Example: `compress test.txt compressed`
  - Description: Compresses the file using the Brotli algorithm with Streams API. The compressed file is saved in the destination directory with a `.br` extension (e.g., `compressed/test.br`).
- **Decompress file**
  - Command: `decompress path_to_file path_to_destination`
  - Example: `decompress compressed/test.br decompressed`
  - Description: Decompresses the file using the Brotli algorithm with Streams API. The decompressed file is saved in the destination directory with its original extension (e.g., `decompressed/test.txt`). The result must match the original file.

## Notes
- All file operations (copy, move, compress, decompress) use the Streams API for efficient handling of large files.
- The program ensures that decompressed files are identical to the originals (no data loss with Brotli).
- Paths can be relative (e.g., `documents/file.txt`) or absolute (e.g., `C:/Users/Alex/file.txt` or `/home/user/file.txt`).
- Error handling is implemented to provide meaningful feedback and allow continued operation.
