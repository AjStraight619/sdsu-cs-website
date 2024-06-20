import { Prisma, Syllabus } from "@prisma/client";
import DragAndDropWrapper from "../dashboard/drag-and-drop-wrapper";
import { useObjectURL } from "@/hooks/useObjectURL";
import { useMaterial } from "@/context/course-materials-context";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { CircleMinusIcon, UploadIcon } from "lucide-react";
import { useRef } from "react";

type SyllabusContentProps = {
  syllabus: Syllabus[] | undefined;
};

export default function SyllabusContent({ syllabus }: SyllabusContentProps) {
  const { files, setFiles } = useMaterial();
  const objectUrl = useObjectURL(files[0] || null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleRemoveFile = () => {
    setFiles([]);
  };

  return (
    <Card className="relative">
      {files.length > 0 && (
        <div className="absolute top-2 right-2 flex items-center gap-x-2">
          <Button
            onClick={() => handleRemoveFile()}
            type="button"
            variant="outline"
          >
            <CircleMinusIcon size={15} className="mr-1" />
            Remove
          </Button>
          <Button variant="outline">
            <UploadIcon size={15} className="mr-1" />
            Upload
          </Button>
        </div>
      )}

      <CardHeader>
        <CardTitle>Syllabus</CardTitle>
      </CardHeader>
      <CardContent>
        {objectUrl || (syllabus && syllabus.length > 0) ? (
          <div className="flex-grow">
            <iframe
              src={objectUrl || (syllabus && syllabus[0].url)}
              style={{ height: "800px" }}
              className="w-full h-full"
            ></iframe>
          </div>
        ) : (
          <DragAndDropWrapper>
            <div>Add syllabus</div>
          </DragAndDropWrapper>
        )}
      </CardContent>
    </Card>
  );
}
