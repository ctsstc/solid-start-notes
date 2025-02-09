/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createEffect, createSignal, Show, useTransition } from 'solid-js'
import { Note } from '~/lib/types'
import { classHelper } from '~/utilities/class-helper'
import { useLocation } from '@solidjs/router'

export default function SidebarNote(props: { note: Note }) {
  const location = useLocation();
  const [isPending] = useTransition();
  const [isExpanded, setIsExpanded] = createSignal(false);
  const isActive = () => {
    return location.pathname.startsWith(`/notes/${props.note.id}`);
  };
  let itemRef!: HTMLDivElement;

  let title = props.note.title;
  createEffect(() => {
    if (props.note.title !== title) {
      title = props.note.title;
      itemRef.classList.add("flash");
    }
  });

  return (
    <div
      ref={itemRef}
      onAnimationEnd={() => {
        itemRef.classList.remove("flash");
      }}
      class={classHelper(
        "sidebar-note-list-item",
        isExpanded() ? "note-expanded" : ""
      )}
    >
      <header class="sidebar-note-header">
        <strong>{props.note.title}</strong>
        <small>{props.note.updatedAt}</small>
      </header>
      <a
        href={`/notes/${props.note.id}`}
        class={classHelper(
          "sidebar-note-open",
          isPending() ? "is-pending" : "",
          isActive() ? "is-active" : ""
        )}
      >
        Open note for preview
      </a>
      <button
        class="sidebar-note-toggle-expand"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded((isExpanded) => !isExpanded);
        }}
      >
        <Show
          when={isExpanded()}
          fallback={
            <img
              src="/chevron-down.svg"
              width="10px"
              height="10px"
              alt="Collapse"
            />
          }
        >
          <img src="/chevron-up.svg" width="10px" height="10px" alt="Expand" />
        </Show>
      </button>
      <div
        style={{
          display: isExpanded() ? "block" : "none",
        }}
      >
        <p
          class="sidebar-note-excerpt"
          innerHTML={props.note.body || `<i>No content</i>`}
        />
      </div>
    </div>
  );
}
