import React, { useEffect, useRef } from 'react';
import { AntiButtonOK } from '../components/Buttons/AntiButtons';
import { NakedInput } from '../components/Elements';

const DescriptionInputField = ({
  description,
  setDescription,
  setShowEditDescription,
}) => {
  const editFieldRef = useRef(null);

  const handleFocus = (e) => {
    e.target.select();
  };

  const onEdit = (e) => {
    e.preventDefault();
    // editDescription(id, newDescription);
    setShowEditDescription(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      console.log('handleClickOutside');
      if (
        editFieldRef.current &&
        !editFieldRef.current.contains(event.target)
      ) {
        setShowEditDescription(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editFieldRef, setShowEditDescription]);

  return (
    <form onSubmit={onEdit} ref={editFieldRef}>
      <NakedInput
        type="text"
        autoFocus
        value={description}
        onFocus={handleFocus}
        onChange={(e) => setDescription(e.target.value)}
      />
      <AntiButtonOK type="submit">save</AntiButtonOK>
    </form>
  );
};

export default DescriptionInputField;
