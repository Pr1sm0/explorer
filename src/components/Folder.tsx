import { Component } from "react";
import FileItem, { IFile } from "./FileItem";

export interface IFolder {
  name: string;
  type: string;
  children?: (IFile | IFolder)[];
}

type FolderProps = {
  folder: IFolder;
  expandedFolders: Set<string>;
  filteredFolders: Set<string>;
  searchQuery: string;
  setNewExpandedFolders: (newExpandedFolders: Set<string>) => void;
};

class Folder extends Component<FolderProps> {
  isFolderExpanded(folderName: string) {
    return this.props.expandedFolders.has(folderName);
  }

  toggleFolder(folderName: string) {
    const { expandedFolders, setNewExpandedFolders } = this.props;
    const newExpandedFolders = new Set(expandedFolders);

    if (expandedFolders.has(folderName)) {
      newExpandedFolders.delete(folderName);
      this.collapseSubfolders(folderName, newExpandedFolders);
    } else {
      newExpandedFolders.add(folderName);
    }

    setNewExpandedFolders(newExpandedFolders);
  }

  collapseSubfolders(folderName: string, expandedFoldersSet: Set<string>) {
    expandedFoldersSet.forEach((expandedFolder) => {
      if (
        expandedFolder.startsWith(folderName) &&
        expandedFolder !== folderName
      ) {
        expandedFoldersSet.delete(expandedFolder);
      }
    });
  }

  renderFolder(folder: IFolder, parentName = "") {
    const { name, children } = folder;
    const { searchQuery, filteredFolders } = this.props;
    const isExpanded = this.isFolderExpanded(`${parentName}/${name}`);

    return (
      ((searchQuery && filteredFolders.has(`${parentName}/${name}`)) ||
        (!searchQuery && !isExpanded) ||
        isExpanded) && (
        <li key={name}>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => this.toggleFolder(`${parentName}/${name}`)}
          >
            {isExpanded ? "-" : "+"} {name}
          </span>
          {isExpanded && (
            <ul style={{ listStyleType: "none" }}>
              {children &&
                children.map((item) =>
                  item.type === "FOLDER" ? (
                    this.renderFolder(item as IFolder, `${parentName}/${name}`)
                  ) : (
                    <FileItem key={item.name} file={item as IFile} searchQuery={searchQuery} />
                  )
                )}
            </ul>
          )}
        </li>
      )
    );
  }

  render() {
    const { folder } = this.props;

    return this.renderFolder(folder);
  }
}

export default Folder;
