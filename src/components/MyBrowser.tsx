import { Component } from "react";
import { printSpiral } from "../utils/matrix";
import { myParseInt } from "../utils/parseIntClone";
import data from "../utils/data.json";
import Folder, { IFolder } from "./Folder";
import { IFile } from "./FileItem";

type MyBrowserProps = {
  expandedFolders: string[];
};

type MyBrowserState = {
  searchQuery: string;
  expandedFolders: Set<string>;
  filteredFolders: Set<string>;
};

class MyBrowser extends Component<MyBrowserProps, MyBrowserState> {
  constructor(props: MyBrowserProps) {
    super(props);
    const { expandedFolders } = props;
    const expandedSet = new Set<string>();
    if (expandedFolders) {
      expandedFolders.forEach((path) => {
        expandedSet.add(path);
        const parts = path.split("/");
        for (let i = 1; i < parts.length; i++) {
          expandedSet.add(parts.slice(0, i + 1).join("/"));
        }
      });
    }
    this.state = {
      searchQuery: "",
      filteredFolders: new Set<string>(),
      expandedFolders: expandedSet,
    };

    // TASK 1
    console.log("Task 1:");
    console.log(myParseInt("123") + 2);

    // TASK 2
    const matrix: number[][] = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    printSpiral(matrix);
  }

  expandFoldersWithMatchingFiles() {
    const { searchQuery } = this.state;
    if (!searchQuery) return;

    const foldersToExpand = new Set<string>();
    data.forEach((folder) => {
      this.checkFolderForMatchingFiles(
        folder,
        searchQuery,
        "",
        foldersToExpand
      );
    });

    this.setState({ expandedFolders: foldersToExpand });
    this.setState({ filteredFolders: foldersToExpand });
  }

  checkFolderForMatchingFiles(
    folder: IFolder,
    searchQuery: string,
    parentName: string,
    foldersToExpand: Set<string>
  ) {
    const { children } = folder;
    let containsMatchingFile = false;

    if (children) {
      children.forEach((item) => {
        if ("children" in item) {
          this.checkFolderForMatchingFiles(
            item as IFolder,
            searchQuery,
            `${parentName}/${folder.name}`,
            foldersToExpand
          );
        } else {
          const file = item as IFile;
          if (file.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            containsMatchingFile = true;
          }
        }
      });
    }

    if (containsMatchingFile) {
      let fullPath = parentName ? `${parentName}/${folder.name}` : folder.name;
      while (fullPath) {
        foldersToExpand.add(fullPath);
        const lastSlashIndex = fullPath.lastIndexOf("/");
        if (lastSlashIndex === -1) break;
        fullPath = fullPath.substring(0, lastSlashIndex);
      }
    }
  }

  setNewExpandedFolders(newExpandedFolders: Set<string>) {
    this.setState({ expandedFolders: newExpandedFolders });
  }

  render() {
    const { searchQuery, expandedFolders, filteredFolders } = this.state;

    return (
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) =>
            this.setState({ searchQuery: e.target.value }, () => {
              if (e.target.value) {
                this.expandFoldersWithMatchingFiles();
              } else {
                this.setState({ expandedFolders: new Set<string>() });
              }
            })
          }
        />
        <ul style={{ listStyleType: "none" }}>
          {data.map((item) => (
            <Folder
              key={item.name}
              folder={item}
              expandedFolders={expandedFolders}
              filteredFolders={filteredFolders}
              searchQuery={searchQuery}
              setNewExpandedFolders={this.setNewExpandedFolders.bind(this)}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default MyBrowser;
