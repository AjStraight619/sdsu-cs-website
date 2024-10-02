import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from './button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
type SubmitButton2Props = ButtonProps & {
  children: ReactNode;
  isUploading?: boolean;
};
export default function SubmitButton2({
  children,
  isUploading,
  ...props
}: SubmitButton2Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending || isUploading}
      variant={props.variant}
      size={props.size}
      type="submit"
      className={cn(
        `${props.className ? props.className : ''}`,
        pending ? 'bg-muted-foreground' : '',
      )}
    >
      {pending ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
}
