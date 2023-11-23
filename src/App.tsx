import { useMemo, useState } from 'react';
import { useQuestionEls } from './hooks/useQuestionEls';
import { useActiveQuestionIndex } from './hooks/useActiveQuestionIndex';
import { useHovering } from './hooks/common/useHovering';
import { isSharePage } from './helpers/sharePage';

function App() {
  const { questions, questionEls } = useQuestionEls();
  const activeQuestionIndex = useActiveQuestionIndex();
  const [elRef, hovering] = useHovering<HTMLUListElement>();
  const [open, setOpen] = useState(true);
  const show = useMemo(() => open || hovering, [hovering, open]);

  const handleClickList: React.MouseEventHandler<HTMLUListElement> = (event) => {
    if (event.target instanceof HTMLLIElement) {
      const targetIndex = Number(event.target.dataset.index);
      if (!isSharePage) {
        questionEls.forEach((q) => {
          q.style.scrollMarginTop = '56px';
        });
      }
      questionEls?.[targetIndex]?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClickEye = () => {
    setOpen(!open);
  };

  return (
    <>
      <style>{`@unocss-placeholder`}</style>
      <div className={`transition-width ${show ? 'w-[var(--app-width)]' : 'w-22px'} `}>
        <div className="flex select-none justify-between pb-2">
          <div className="overflow-hidden whitespace-nowrap">📄 Questions</div>
          <div
            className={`cursor-pointer ${show ? '' : 'opacity-50 grayscale'} `}
            onClick={handleClickEye}
            title={show ? 'hide' : 'show'}
          >
            👁️
          </div>
        </div>
        <div className="relative after:(content-[''] absolute bottom-0 right-4px w-full h-.7em bg-gradient-to-t from-white from-opacity-90 to-white to-opacity-20)">
          <ul
            ref={elRef}
            className="max-h-[var(--app-max-list-height)] list-inside list-disc overflow-y-auto "
            scrollbar={`~ rounded transition-all thumb-color-transparent hover:thumb-color-gray-300  track-color-transparent ${
              show ? 'w-4px' : 'w-0'
            }`}
            onClick={handleClickList}
          >
            {questions.map((q, index) => (
              <li
                key={index}
                className={`hover:(text-brand-primary)  box-border w-full cursor-pointer overflow-hidden whitespace-nowrap py-1  pr-1  leading-snug last-of-type:pb-.7em ${
                  show ? 'text-ellipsis' : 'pl-8px'
                }`}
                text={`12px ${activeQuestionIndex === index ? 'brand-primary' : 'gray-primary'}`}
                data-index={index}
              >
                {q}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
