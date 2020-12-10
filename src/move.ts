import cloneDeep from './util/cloneDeep';

type File = {
  id: string;
  name: string;
};

type Folder = {
  id: string;
  name: string;
  files: File[];
};

type List = Folder[];

export default function move(list: List, source: string, destination: string): List {
  let fileToMove: File | null = null;
  let destinationIndex = -1;

  if (!list.length) {
    throw new Error('List cannot be empty');
  }

  // are we allowed to mutate? let's assume not.
  const copyOfList = cloneDeep(list);

  copyOfList.forEach((folder: Folder, folderIndex) => {
    if (folder.id === source) {
      throw new Error('You cannot move a folder');
    }

    if (folder.id === destination) {
      destinationIndex = folderIndex;
    }

    folder.files.forEach((file: File, fileIndex) => {
      if (file.id === destination) {
        throw new Error('You cannot specify a file as the destination');
      }

      if (file.id === source) {
        fileToMove = file;

        // remove found file from the original folder.
        folder.files.splice(fileIndex, 1);
      }
    });
  });

  if (!fileToMove) {
    throw new Error('Source file not found');
  }

  if (destinationIndex === -1) {
    throw new Error('Destination folder not found');
  }

  // add file to the destination folder.
  copyOfList[destinationIndex].files.push(fileToMove);

  return copyOfList;
}
