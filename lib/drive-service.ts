import { drive } from "./google-drive";

const getFolderByName = async (
  name: string,
  parentId: string | null = null
) => {
  const query = parentId
    ? `'${parentId}' in parents and name='${name}' and mimeType='application/vnd.google-apps.folder'`
    : `name='${name}' and mimeType='application/vnd.google-apps.folder'`;

  const response = await drive.files.list({
    q: query,
    fields: "files(id, name)",
  });

  if (!response || !response.data || !response.data.files) return null;

  return response.data.files.length ? response.data.files[0] : null;
};

const listFilesAndFolders = async (folderId: string) => {
  const response = await drive.files.list({
    q: `'${folderId}' in parents`,
    fields: "files(id, name, mimeType, webViewLink, webContentLink)",
  });

  return response.data.files || [];
};

const getFileContent = async (fileId: string) => {
  const response = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );

  return response.data;
};

export { getFolderByName, listFilesAndFolders, getFileContent };
