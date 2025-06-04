interface PageFooterProps {
  children: React.ReactNode;
}

export default function PageFooter({ children }: PageFooterProps) {
  return (
    <div className="fixed right-0 bottom-0 left-64 flex justify-end border-t border-gray-200 bg-white px-12 py-4">
      {children}
    </div>
  );
}
