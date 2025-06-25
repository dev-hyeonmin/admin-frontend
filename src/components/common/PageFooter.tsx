import Link from 'next/link';

interface PageFooterProps {
  secondaryText?: string;
  secondaryAction?: string | (() => void);
  primaryText: string;
  primaryAction?: string | (() => void);
}

/**
 * 페이지 하단 컴포넌트
 * @param secondaryText
 * @param secondaryAction
 * @param primaryText
 * @param primaryAction - 값이 업을 경우 제출(type='submit')으로 간주
 * @constructor
 */
export default function PageFooter({
  secondaryText,
  secondaryAction,
  primaryText,
  primaryAction,
}: PageFooterProps) {
  return (
    <div className="fixed right-0 bottom-0 left-64 flex justify-end space-x-2 border-t border-gray-200 bg-white px-12 py-4">
      {secondaryText &&
        secondaryAction &&
        renderActionButton('secondary', secondaryText, secondaryAction)}
      {renderActionButton('primary', primaryText, primaryAction)}
    </div>
  );
}

function renderActionButton(
  type: 'secondary' | 'primary',
  text: string,
  action?: string | (() => void)
) {
  // global.css
  const className = type === 'primary' ? 'primary-button' : 'secondary-button';

  if (typeof action === 'string') {
    return (
      <Link href={action} className={className}>
        {text}
      </Link>
    );
  }

  return (
    <button onClick={action} className={className} type={action ? 'button' : 'submit'}>
      {text}
    </button>
  );
}
