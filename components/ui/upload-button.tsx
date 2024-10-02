import React, { ReactNode } from 'react';
import { Button, ButtonProps } from './button';
import { Loader2 } from 'lucide-react';

// Extend the props to include ButtonProps directly
type UploadButtonProps = ButtonProps & {
  isUploading: boolean;
  children: ReactNode;
};

const UploadButton = ({
  isUploading,
  children,
  ...buttonProps
}: UploadButtonProps) => {
  return (
    <Button {...buttonProps}>
      {isUploading ? (
        <>
          Uploading <Loader2 className="ml-2 animate-spin" />{' '}
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default UploadButton;
