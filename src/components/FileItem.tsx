import { Component } from "react";

export interface IFile {
  name: string;
  mime: string;
  type: string;
}

type FileProps = {
  file: IFile;
  searchQuery: string;
};

class FileItem extends Component<FileProps> {
  render() {
    const { file, searchQuery } = this.props;
    if (
      searchQuery &&
      !file.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return null;
    }
    return <li key={file.name}>{file.name}</li>;
  }
}

export default FileItem;
