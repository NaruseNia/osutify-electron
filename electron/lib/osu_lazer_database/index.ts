import Realm from "realm";

export class OsuLazerDatabase {
  private connection: Realm | null;

  constructor() {
    this.connection = null;
  }

  public static async open(path: string): Promise<OsuLazerDatabase> {
    const db = new OsuLazerDatabase();
    console.log("Try to connect realm db...");
    db.connection = await Realm.open({
      path,
      schema: [
        BeatmapSet,
        File,
        Beatmap,
        KeyBinding,
        Ruleset,
        BeatmapDifficulty,
        BeatmapMetadata,
        RealmNamedFileUsage,
        RealmUser,
        BeatmapUserSettings,
      ],
      schemaVersion: 40,
    });

    return db;
  }

  public getObjects(type: string) {
    if (this.connection) {
      return this.connection.objects(type);
    } else {
      throw new Error("You should open connection at first.");
    }
  }

  public close() {
    if (this.connection) this.connection.close();
  }
}

export namespace OsuLazerModels {}

export type OsuBeatmapData = {
  id: number;
  set_id: number;
  artist: string | null;
  artist_unicode: string | null;
  title: string | null;
  title_unicode: string | null;
  audio: string | null;
  background: string | null;
  hash: string | null;
  file_name: string | null;
  path: string | null;
  total_time: number;
  bpm: number;
};

export class Beatmap extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: "Beatmap",
    primaryKey: "ID",
    properties: {
      ID: "uuid",
      DifficultyName: "string?",
      Ruleset: "Ruleset",
      Difficulty: "BeatmapDifficulty",
      Metadata: "BeatmapMetadata",
      BeatmapSet: "BeatmapSet",
      UserSettings: "BeatmapUserSettings",
      Status: "int",
      Length: "double",
      BPM: "double",
      Hash: "string?",
      StarRating: "double",
      MD5Hash: "string?",
      OnlineMD5Hash: "string?",
      LastLocalUpdate: "date?",
      LastOnlineUpdate: "date?",
      EditorTimestamp: "double?",
      EndTimeObjectCount: "int",
      TotalObjectCount: "int",
      Hidden: "bool",
      AudioLeadIn: "double",
      StackLeniency: "float",
      SpecialStyle: "bool",
      LetterboxInBreaks: "bool",
      WidescreenStoryboard: "bool",
      EpilepsyWarning: "bool",
      SamplesMatchPlaybackRate: "bool",
      LastPlayed: "date?",
      DistanceSpacing: "double",
      BeatDivisor: "int",
      GridSize: "int",
      TimelineZoom: "double",
      OnlineID: { type: "int", indexed: true },
      CountdownOffset: "int",
    },
  };
}

export class BeatmapUserSettings extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: "BeatmapUserSettings",
    embedded: true,
    properties: {
      Offset: "double",
    },
  };
}

export class BeatmapDifficulty extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: "BeatmapDifficulty",
    embedded: true,
    properties: {
      DrainRate: "float",
      CircleSize: "float",
      OverallDifficulty: "float",
      ApproachRate: "float",
      SliderMultiplier: "double",
      SliderTickRate: "double",
    },
  };
}

export class BeatmapMetadata extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: "BeatmapMetadata",
    properties: {
      Title: "string?",
      TitleUnicode: "string?",
      Artist: "string?",
      ArtistUnicode: "string?",
      Source: "string?",
      Tags: "string?",
      PreviewTime: "int",
      AudioFile: "string?",
      BackgroundFile: "string?",
      Author: "RealmUser",
    },
  };
}

export class BeatmapSet extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: "BeatmapSet",
    primaryKey: "ID",
    properties: {
      ID: "uuid",
      DateAdded: "date",
      DateSubmitted: "date?",
      DateRanked: "date?",
      Beatmaps: "Beatmap[]",
      Files: "RealmNamedFileUsage[]",
      DeletePending: "bool",
      Hash: "string?",
      Protected: "bool",
      OnlineID: { type: "int", indexed: true },
      Status: "int",
    },
  };
}

export class File extends Realm.Object<File> {
  static schema: Realm.ObjectSchema = {
    name: "File",
    primaryKey: "Hash",
    properties: {
      Hash: "string?",
    },
  };
}

export class KeyBinding extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: "KeyBinding",
    primaryKey: "ID",
    properties: {
      ID: "uuid",
      Variant: "int?",
      Action: "int",
      KeyCombination: "string?",
      RulesetName: "string?",
    },
  };
}

export class RealmNamedFileUsage extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: "RealmNamedFileUsage",
    embedded: true,
    properties: {
      File: "File",
      Filename: "string?",
    },
  };
}

export class RealmUser extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: "RealmUser",
    embedded: true,
    properties: {
      CountryCode: "string?",
      OnlineID: "int",
      Username: "string?",
    },
  };
}

export class Ruleset extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: "Ruleset",
    primaryKey: "ShortName",
    properties: {
      LastAppliedDifficultyVersion: "int",
      ShortName: "string?",
      Name: "string?",
      InstantiationInfo: "string?",
      Available: "bool",
      OnlineID: { type: "int", indexed: true },
    },
  };
}

export class RulesetSetting extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: "RulesetSetting",
    properties: {
      Variant: { type: "int", indexed: true },
      Key: "string",
      Value: "string",
      RulesetName: { type: "string", indexed: true },
    },
  };
}

export class Score extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: "Score",
    primaryKey: "ID",
    properties: {
      ID: "uuid",
      BeatmapInfo: "Beatmap",
      Ruleset: "Ruleset",
      Files: "RealmNamedFileUsage[]",
      Hash: "string?",
      DeletePending: "bool",
      TotalScore: "int",
      MaxCombo: "int",
      Accuracy: "double",
      HasReplay: "bool",
      Date: "date",
      PP: "double?",
      OnlineID: { type: "int", indexed: true },
      User: "RealmUser",
      Mods: "string?",
      Statistics: "string?",
      Rank: "int",
      Combo: "int",
    },
  };
}

export class Skin extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: "Skin",
    primaryKey: "ID",
    properties: {
      ID: "uuid",
      Name: "string?",
      Creator: "string?",
      InstantiationInfo: "string?",
      Hash: "string?",
      Protected: "bool",
      Files: "RealmNamedFileUsage[]",
      DeletePending: "bool",
    },
  };
}
