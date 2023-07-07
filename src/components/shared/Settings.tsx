"use client";

import { Button, Dropdown, Modal } from "flowbite-react";
import { useState } from "react";
import { HiCog } from "react-icons/hi";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { SessionTimerConfig } from "@/types/setting.type";

const focusPeriods = [
  { label: "25 minutes", value: 25 },
  { label: "30 minutes", value: 30 },
  { label: "35 minutes", value: 35 },
  { label: "40 minutes", value: 40 },
  { label: "45 minutes", value: 45 },
  { label: "50 minutes", value: 50 },
  { label: "55 minutes", value: 55 },
  { label: "60 minutes", value: 60 },
];

const breakPeriods = [
  { label: "5 minutes", value: 5 },
  { label: "10 minutes", value: 10 },
  { label: "15 minutes", value: 15 },
];

const ringtoneSounds = [
  { label: "Alarm 1", value: "/music/ringtone1.wav" },
  { label: "Alarm 2", value: "/music/ringtone2.wav" },
  { label: "Alarm 3", value: "/music/ringtone3.wav" },
  { label: "Alarm 4", value: "/music/ringtone4.wav" },
];

export default function Settings({
  settings,
}: {
  settings: SessionTimerConfig;
}) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [modalSize, setModalSize] = useState<string>("2xl");
  const props = { modalSize, openModal, setModalSize, setOpenModal };

  const [newSettings, setNewSettings] = useState({
    endOfSessionSound: settings.endOfSessionSound || "/music/ringtone1.wav",
    endOfBreakSound: settings.endOfBreakSound || "/music/ringtone2.wav",
    sessionDuration: settings.sessionDuration || 25,
    breakDuration: settings.breakDuration || 5,
  });
  const [isProcessing, setProcessing] = useState(false);

  const onUpdateSettings = async () => {
    setProcessing(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSettings),
      });
      const data = await res.json();
      toast.success(data.message || "Settings updated");
      router.refresh();
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
    setProcessing(false);
    props.setOpenModal(undefined);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => props.setOpenModal("size")}
        className="text-gray-500 hover:bg-gray-100 bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2"
      >
        <HiCog className="w-5 h-5" />
      </button>
      <Modal
        show={props.openModal === "size"}
        size={props.modalSize}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Interlude Settings</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 px-6 py-4">
            <div className="flex items-center flex-wrap text-sm gap-2 justify-between">
              <p className="w-full">Focus period</p>
              <Dropdown
                label={`${newSettings.sessionDuration} minutes`}
                size="sm"
                color="indigo"
              >
                {focusPeriods.map((period) => (
                  <Dropdown.Item
                    key={period.value}
                    onClick={() => {
                      setNewSettings((prev) => ({
                        ...prev,
                        sessionDuration: period.value,
                      }));
                    }}
                  >
                    {period.label}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
            <div className="flex items-center flex-wrap text-sm gap-2 justify-between">
              <p className="w-full">Break period</p>
              <Dropdown
                label={`${newSettings.breakDuration} minutes`}
                size="sm"
                color="indigo"
              >
                {breakPeriods.map((period) => (
                  <Dropdown.Item
                    key={period.value}
                    onClick={() => {
                      setNewSettings((prev) => ({
                        ...prev,
                        breakDuration: period.value,
                      }));
                    }}
                  >
                    {period.label}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
            <div className="flex items-center flex-wrap text-sm gap-2 justify-between">
              <p className="w-full">End session alarm sound</p>
              <Dropdown
                label={
                  <audio controls>
                    <source
                      src={newSettings.endOfSessionSound}
                      type="audio/wav"
                    />
                  </audio>
                }
                size="sm"
                color="indigo"
              >
                {ringtoneSounds.map((sound) => (
                  <Dropdown.Item
                    key={sound.value}
                    onClick={() => {
                      setNewSettings((prev) => ({
                        ...prev,
                        endOfSessionSound: sound.value,
                      }));
                    }}
                  >
                    {sound.label}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
            <div className="flex items-center flex-wrap text-sm gap-2 justify-between">
              <p className="w-full">End break alarm sound</p>
              <Dropdown
                label={
                  <audio controls>
                    <source
                      src={newSettings.endOfBreakSound}
                      type="audio/wav"
                    />
                  </audio>
                }
                size="sm"
                color="indigo"
              >
                {ringtoneSounds.map((sound) => (
                  <Dropdown.Item
                    key={sound.value}
                    onClick={() => {
                      setNewSettings((prev) => ({
                        ...prev,
                        endOfBreakSound: sound.value,
                      }));
                    }}
                  >
                    {sound.label}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={onUpdateSettings}
            className="bg-primary hover:bg-primary/80"
            isProcessing={isProcessing}
          >
            Save
          </Button>
          <Button
            disabled={isProcessing}
            color="gray"
            onClick={() => props.setOpenModal(undefined)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}
