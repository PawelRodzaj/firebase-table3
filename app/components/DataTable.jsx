"use client";

import { useMemo, useState } from "react";

export default function DataTable({ header, body, footer }) {
  const [sortConfig, setSortConfig] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [collapsedIds, setCollapsedIds] = useState([]);

  const sortedRows = useMemo(() => {
    const rows = [...body];
    if (!sortConfig) {
      return rows;
    }
    const { key, direction } = sortConfig;
    return [...rows].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      if (aValue === undefined || aValue === null) return 1;
      if (bValue === undefined || bValue === null) return -1;
      const bothNumbers =
        typeof aValue === "number" && typeof bValue === "number";
      let comparison = 0;
      if (bothNumbers) {
        comparison = aValue - bValue;
      } else {
        comparison = String(aValue).localeCompare(String(bValue), "pl", {
          numeric: true,
          sensitivity: "base",
        });
      }
      return direction === "asc" ? comparison : -comparison;
    });
  }, [body, sortConfig]);

  const collapsedSet = useMemo(
    () => new Set(collapsedIds),
    [collapsedIds]
  );

  const displayedItems = useMemo(() => {
    const items = [];
    let buffer = [];
    for (const row of sortedRows) {
      if (collapsedSet.has(row.id)) {
        buffer.push(row);
      } else {
        if (buffer.length) {
          items.push({ type: "collapsed", rows: buffer });
          buffer = [];
        }
        items.push({ type: "row", row });
      }
    }
    if (buffer.length) {
      items.push({ type: "collapsed", rows: buffer });
    }
    return items;
  }, [sortedRows, collapsedSet]);

  const visibleRowIds = useMemo(
    () =>
      displayedItems
        .filter((item) => item.type === "row")
        .map((item) => item.row.id),
    [displayedItems]
  );

  const allVisibleSelected =
    visibleRowIds.length > 0 &&
    visibleRowIds.every((id) => selectedIds.includes(id));

  const toggleSelectAllVisible = () => {
    if (allVisibleSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !visibleRowIds.includes(id))
      );
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...visibleRowIds])));
    }
  };

  const toggleRowSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleCollapseSelected = () => {
    if (!selectedIds.length) return;
    setCollapsedIds((prev) => Array.from(new Set([...prev, ...selectedIds])));
    setSelectedIds([]);
  };

  const handleRestoreGroup = (groupRowIds) => {
    setCollapsedIds((prev) => prev.filter((id) => !groupRowIds.includes(id)));
  };

  const handleSortAsc = (key) => {
    setSortConfig({ key, direction: "asc" });
    setCollapsedIds([]);
    setSelectedIds([]);
  };

  const handleSortDesc = (key) => {
    setSortConfig({ key, direction: "desc" });
    setCollapsedIds([]);
    setSelectedIds([]);
  };

  const handleSortReset = () => {
    setSortConfig(null);
    setCollapsedIds([]);
    setSelectedIds([]);
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-2 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Tabela z sortowaniem i grupowaniem
          </h2>
          <p className="text-xs text-slate-500">
            Zaznacz wiersze i użyj przycisku, aby je ukryć. Użyj przycisków w nagłówku, aby sortować.
          </p>
        </div>
        <button
          type="button"
          onClick={handleCollapseSelected}
          disabled={!selectedIds.length}
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 text-xs font-medium text-white disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
        >
          Ukryj zaznaczone ({selectedIds.length})
        </button>
      </div>

      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="w-10 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300"
                checked={allVisibleSelected}
                onChange={toggleSelectAllVisible}
              />
            </th>
            {header.map((column) => (
              <th
                key={column.key}
                className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                <div className="flex items-center gap-1">
                  <span>{column.label}</span>
                  <div className="inline-flex rounded-md border border-slate-200 bg-white">
                    <button
                      type="button"
                      onClick={() => handleSortAsc(column.key)}
                      className="px-1 text-[10px] leading-none hover:bg-slate-100"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSortDesc(column.key)}
                      className="px-1 text-[10px] leading-none hover:bg-slate-100"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={handleSortReset}
                      className="px-1 text-[10px] leading-none hover:bg-slate-100"
                    >
                      ↺
                    </button>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 bg-white">
          {displayedItems.map((item, index) => {
            if (item.type === "row") {
              const row = item.row;
              return (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300"
                      checked={selectedIds.includes(row.id)}
                      onChange={() => toggleRowSelection(row.id)}
                    />
                  </td>
                  {header.map((column) => (
                    <td
                      key={column.key}
                      className="whitespace-nowrap px-3 py-2 text-sm text-slate-700"
                    >
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              );
            }

            const groupIds = item.rows.map((r) => r.id);
            const count = item.rows.length;

            return (
              <tr key={`collapsed-${index}`} className="bg-slate-100">
                <td
                  className="px-3 py-3 text-xs font-medium text-slate-600"
                  colSpan={header.length + 1}
                >
                  <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                    <span>
                      Ukryto {count} wierszy. Możesz je przywrócić jednym kliknięciem.
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRestoreGroup(groupIds)}
                      className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
                    >
                      Pokaż ukryte wiersze
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}

          {displayedItems.length === 0 && (
            <tr>
              <td
                className="px-3 py-4 text-center text-sm text-slate-500"
                colSpan={header.length + 1}
              >
                Brak danych do wyświetlenia.
              </td>
            </tr>
          )}
        </tbody>

        {footer && footer.length > 0 && (
          <tfoot className="border-t border-slate-200 bg-slate-50">
            <tr>
              <td className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500" />
              {header.map((column, index) => (
                <td
                  key={column.key}
                  className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700"
                >
                  {footer[index] ?? ""}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
