# Welcome to a Human written code :)

import os


# Returns the list of file inside the folder (return type : list)
def load_data(dir_location):
    file_list = os.listdir(dir_location)
    return file_list

def main():
    Voyager1_Files = os.path.join('RAG data','Voyager 1')
    Voyager2_Files = os.path.join('RAG data','Voyager 2')

    Voyager1_Data = load_data(Voyager1_Files)           # Data is in list
    Voyager2_Data = load_data(Voyager2_Files)           # Data is in list



    return 0

if __name__ == '__main__':
    main()        