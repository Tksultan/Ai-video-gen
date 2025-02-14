import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from 'next/image';

function CustomLoading({ loading, setLoading, status }) {
  if (!loading) return null;

  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {/* Hidden Title for Accessibility */}
          <VisuallyHidden>
            <AlertDialogTitle>Generating Video</AlertDialogTitle>
          </VisuallyHidden>
        </AlertDialogHeader>
        <div className="bg-white flex flex-col items-center justify-center gap-2 p-4">
          <Image src={'/loading.gif'} width={100} height={100} alt="Loading..." />
          <p className="mt-2 text-center">{status+'...'}</p>
          <p className="mt-2 text-center">Work in progress. Don't refresh</p>
        
        <AlertDialogFooter >
          <AlertDialogCancel onClick={() => setLoading(false)}>
            Stop Generating
          </AlertDialogCancel>
        </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;
